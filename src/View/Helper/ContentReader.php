<?php

namespace ContentReader\View\Helper;

use Omeka\Api\Representation\AbstractResourceEntityRepresentation;
use Zend\View\Helper\AbstractHelper;

class ContentReader extends AbstractHelper
{
    /**
     * Get the link to the search history button (to save or to delete).
     *
     * @return string
     */
    public function __invoke(AbstractResourceEntityRepresentation $resource)
    {
        $view = $this->getView();
        $resource_id = $resource->id();
        
        $site = $this->currentSite();
        $user = $view->identity();
        
        return $view->partial('common/content-reader', [
            'resource' => $resource,
            'user' => $user,
        ]);
    }

   
    /**
     * Get the current site from the view.
     *
     * @return \Omeka\Api\Representation\SiteRepresentation|null
     */
    protected function currentSite()
    {
        $view = $this->getView();
        return isset($view->site)
            ? $view->site
            : $view->getHelperPluginManager()->get('Zend\View\Helper\ViewModel')->getRoot()->getVariable('site');
    }
}
