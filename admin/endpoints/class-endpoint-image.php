<?php
/**
 * WPSEO plugin file.
 *
 * @package WPSEO\Admin\Endpoints
 */

/**
 * Represents an implementation of the WPSEO_Endpoint interface to register one or multiple endpoints.
 */
class WPSEO_Endpoint_Image implements WPSEO_Endpoint {

	const REST_NAMESPACE = 'yoast/v1';
	const ENDPOINT_SINGULAR = 'image';

	const CAPABILITY_RETRIEVE = 'manage_options';

	/** @var WPSEO_Indexable_Service */
	private $service;

	/**
	 * Sets the service provider.
	 *
	 * @param WPSEO_Image_Service $service The service provider.
	 */
	public function __construct( WPSEO_Image_Service $service ) {
		$this->service = $service;
	}

	/**
	 * Registers the routes for the endpoints.
	 *
	 * @return void
	 */
	public function register() {
		register_rest_route( self::REST_NAMESPACE, self::ENDPOINT_SINGULAR, array(
			'methods'             => 'GET',
			'args'                => array(
				'url' => array(
					'required'    => true,
					'type'        => 'string',
					'description' => 'The image url to retrieve',
				),
			),
			'callback'            => array(
				$this->service,
				'get_image',
			),
			'permission_callback' => array(
				$this,
				'can_retrieve_data',
			),
		) );
	}

	/**
	 * Determines whether or not data can be retrieved for the registered endpoints.
	 *
	 * @return bool Whether or not data can be retrieved.
	 */
	public function can_retrieve_data() {
		return true; // current_user_can( self::CAPABILITY_RETRIEVE );
	}
}