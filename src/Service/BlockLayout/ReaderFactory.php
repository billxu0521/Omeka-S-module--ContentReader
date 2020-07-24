<?php
namespace ContentReader\Service\BlockLayout;

use Interop\Container\ContainerInterface;
use ContentReader\Site\BlockLayout\ContentReader;
use Zend\ServiceManager\Factory\FactoryInterface;

class ReaderFactory implements FactoryInterface
{
	public function __invoke(ContainerInterface $services, $requestedName, array $options = null)
	{
		return new ContentReader(
			$services->get('FormElementManager'),
			$services->get('Config')['DefaultSettings']['ReaderBlockForm']
		);
	}
}
?>