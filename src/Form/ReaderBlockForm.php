<?php
namespace ContentReader\Form;

use Zend\Form\Element;
use Zend\Form\Form;

class ReaderBlockForm extends Form
{
	public function init()
	{
            $this->add([
			'name' => 'o:block[__blockIndex__][o:data][getSelection]',
			'type' => Element\Checkbox::class,
            'options' => [
				'label' => 'GetSelection',
                                'info' => 'If checked , resouces will be get from Selection'
			]
		]);

		
	}
}
