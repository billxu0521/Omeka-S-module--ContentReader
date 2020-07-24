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
		$form->setData([
			'o:block[__blockIndex__][o:data][height]' => $data['height'],
			'o:block[__blockIndex__][o:data][title]' => $data['title'],
			'o:block[__blockIndex__][o:data][wrapStyle]' => $data['wrapStyle'],
		]);
		$form->prepare();

		$html = '';
		
                $html .= '</div>';
                return $html;
    }

	public function render(PhpRenderer $view, SitePageBlockRepresentation $block)
	{
                $resourceType = $block->dataValue('resource_type', 'items');
                parse_str($block->dataValue('query'), $query);
                $originalQuery = $query;
                $site = $block->page()->site();
               
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
			'height' => $block->dataValue('height'),
			'title' => $block->dataValue('title'),
			'urls' => $urls,
			'wrapStyle' => $block->dataValue('wrapStyle'),
                      ]);
	}
        public function getFulltextText(PhpRenderer $view, SitePageBlockRepresentation $block)
        {
            return strip_tags($this->render($view, $block));
        }   
}
