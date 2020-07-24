<?php
namespace ContentReader;

return [
    'view_manager' => [
        'template_path_stack' => [
            dirname(__DIR__) . '/view',
        ]
    ],
    'block_layouts' => [
        'factories' => [
            'ContentReader' => Service\BlockLayout\ReaderFactory::class,
        ],
    ],
    'form_elements' => [
        'invokables' => [
            Form\ReaderBlockForm::class => Form\ReaderBlockForm::class,
        ],
    ],
    'view_helpers' => [
        'invokables' => [
            'contentReader' => View\Helper\ContentReader::class,
        ],
    ],
    'controllers' => [
        'invokables' => [
            'Reader\Controller\Site\Reader' => Controller\Site\ReaderController::class,
        ],
    ],
    'DefaultSettings' => [
        'ReaderBlockForm' => [
            'height' => '500px',
            'title' => '',
            'wrapStyle' => 'overflow-y: hidden;display: flex;flex-direction: column;justify-content: center;',
        ]
    ],
    'router' => [
        'routes' => [
            'admin' => [
                'child_routes' => [
                    'site' => [
                        'child_routes' => [
                            'slug' => [
                                'child_routes' => [
                                    'content-reader' => [
                                        'type' => 'Literal',
                                        'options' => [
                                            'route' => '/content-reader',
                                            'defaults' => [
                                                '__NAMESPACE__' => 'MetadataCalculator\Controller\Admin',
                                                'controller' => 'index',
                                                'action' => 'index',
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
];

