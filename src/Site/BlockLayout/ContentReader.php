<?php
namespace ContentReader\Site\BlockLayout;

use Omeka\Api\Representation\SiteRepresentation;
use Omeka\Api\Representation\SitePageRepresentation;
use Omeka\Api\Representation\SitePageBlockRepresentation;
use Omeka\Site\BlockLayout\AbstractBlockLayout;
use Zend\View\Renderer\PhpRenderer;
use Zend\View\Model\ViewModel;
use Zend\Form\FormElementManager;

use ContentReader\Form\ReaderBlockForm;

class ContentReader extends AbstractBlockLayout
{
	/**
     * @var FormElementManager
     */
    protected $formElementManager;

    /**
     * @var array
     */
	protected $defaultSettings = [];
	
    /**
     * @param FormElementManager $formElementManager
     * @param array $defaultSettings
     */
    public function __construct(FormElementManager $formElementManager, array $defaultSettings)
    {
        $this->formElementManager = $formElementManager;
        $this->defaultSettings = $defaultSettings;
    }

	public function getLabel() {
		return 'ContentReader';
	}

	public function form(PhpRenderer $view, SiteRepresentation $site,
        SitePageRepresentation $page = null, SitePageBlockRepresentation $block = null
    ) {   
		$form = $this->formElementManager->get(ReaderBlockForm::class);
		$data = $block
			? $block->data() + $this->defaultSettings
			: $this->defaultSettings;
               
                $selectionIsActive = $view->getHelperPluginManager()->has('showSelectionLink');
                if($selectionIsActive == true){
                    $form->setData([
			'o:block[__blockIndex__][o:data][getSelection]' => $data['getSelection'],
                    ]);
                    $form->prepare();

                    $html = '';
                    $html .= '<a href="#" class="collapse" aria-label="collapse"><h4>' . $view->translate('Options'). '</h4></a>';
                    $html .= '<div class="collapsible" style="padding-top:6px;">';
                    $html .= $view->formCollection($form);
                    $html .= '</div>';
                }else{
                    $html = '';
                    $html .= json_encode($selectionIsActive);
                    $html .= '<div>no option</div>';
                }
		
                return $html;
    }

	public function render(PhpRenderer $view, SitePageBlockRepresentation $block)
	{
                $resourceType = $block->dataValue('resource_type', 'items');
                parse_str($block->dataValue('query'), $query);
                $site = $block->page()->site();
                $user = $view->identity();
                $checkSelected = 0;
                if(empty($block->dataValue('getSelection'))){
                    $checkSelected = 0;
                }else{
                    $checkSelected = $block->dataValue('getSelection');
                }
                
                if($checkSelected == 0){
                    $query['site_id'] = $site->id();
                    if (!isset($query['sort_by'])) {
                        $query['sort_by'] = 'created';
                    }
                    if (!isset($query['sort_order'])) {
                        $query['sort_order'] = 'desc';
                    }
                    $response = $view->api()->search($resourceType, $query);
                    $resources = $response->getContent();
                   
                    $urls = [];
                    foreach ($response as $attachment)
                    {
                            foreach($attachment->item()->media() as $media)
                            {
                                    $mediaType = $media->mediaType();
                                    $mediaRenderer = $media->renderer();
                                    if ((strpos($mediaType, 'image/') !== false) || (strpos($mediaRenderer, 'youtube') !== false)) {
                                            array_push($urls, $media->originalUrl());
                                    }
                            }
                    }

                    return $view->partial('common/block-layout/ContentReader', [
                            'resourceType' => 'item',
                            'resources' => $resources,
                            'checkGetSelection' => $block->dataValue('getSelection'),
                            'title' => $block->dataValue('title'),
                            'urls' => $urls,
                          ]);

                }else{
                    if(isset($user)){
                        $resources = [];
                        $query = $view->params()->fromQuery();
                        $query['user_id'] = $user->getId();

                        $selectionItems = $view->api()->search('selection_items', $query)->getContent();
                        foreach ($selectionItems as $selectionItem) {
                            $resources[] = $selectionItem->resource();
                            //array_push($resources, $selectionItem);
                        }
                        return $view->partial('common/block-layout/ContentReader', [
                                'resourceType' => 'item',
                                'resources' => $resources,
                                'checkGetSelection' => $block->dataValue('getSelection'),
                                'title' => $block->dataValue('title'),
                                'urls' => [],
                                'selectionItems' => $selectionItems,
                              ]);
                    }
                }
	}
        public function getFulltextText(PhpRenderer $view, SitePageBlockRepresentation $block)
        {
            return strip_tags($this->render($view, $block));
        }   
}
