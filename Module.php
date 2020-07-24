<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace ContentReader;
use Omeka\Module\AbstractModule;
use Zend\EventManager\Event;
use Zend\EventManager\SharedEventManagerInterface;
use Zend\Mvc\MvcEvent;

class Module extends AbstractModule
{
	public function getConfig()
	{
		return include __DIR__ . '/config/module.config.php';
	}
        
        public function onBootstrap(MvcEvent $event)
    {
        parent::onBootstrap($event);
        $acl = $this->getServiceLocator()->get('Omeka\Acl');
        $acl->allow(
            null,
            ['Reader\Controller\Site\Reader']);
        
    }
        
        public function attachListeners(SharedEventManagerInterface $sharedEventManager)
        {
            $sharedEventManager->attach(
                'Omeka\Controller\Site\Item',
                'view.show.after',
                [$this, 'handleViewShowAfterItem']
            );
           
        }
        
        public function handleViewShowAfterItem(Event $event)
        {

            $view = $event->getTarget();
            $resource = $view->resource;
            echo $view->partial('common/contentreaderviewer', ['resource' => $resource]);
            
        }
}