<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class IndexController extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
        $data['auth'] = "true";
        $data['selected_note'] = "";
        $data['user_id'] = "";
        if (!empty($_SESSION['account'])) {
            $data['auth'] = "false";
            $data['user_id'] = $_SESSION['account']->id;

            $data['selected_note'] = $this->Users_model->get_selected($data['user_id']);
            if (!array_key_exists("status", $data['selected_note'])) {
                $data['selected_note'] = $data['selected_note'][0]->selected_note;
            }
        }
		$this->load->view('home', $data);
	}

    public function logout(){
        unset($_SESSION['account']);
        redirect(base_url().'login');
    }
}
