<?php


require APPPATH . '/libraries/REST_Controller.php';
header('Access-Control-Allow-Origin: *');

class Users extends REST_Controller {

    function __construct($config = 'rest') {
        parent::__construct($config);
    }

    function index_get(){
        $email = $this->get("email");
        $password = $this->get("password");
        if ($email && $password) {
            $result = $this->Users_model->login($email, $password);
        } else if ($email) {
            $result = $this->Users_model->get("email", $email);
        }
        if (array_key_exists("status", $result)) {
            $this->response($result, 200);
        } else {
            $this->response($result, 200);
        }   
    }

    public function index_post(){
        
        if ($this->post("update")) {
            $selected_note = $this->post("note_id");
            $user_id = $this->post("user_id");
            $result = $this->Users_model->update_field("selected_note", $selected_note, $user_id);
    
        } else {
            $data = array(
                'id' => $this->post('id'),
                'email' => $this->post('email'),
                'password' => md5($this->post('password'))
            );
            $result = $this->Users_model->register($data);

        }

        if ($result["status"] != "success") {
            $this->response($result, 200);
        } else {
            $this->response($result, 201);
        }   

    }



}