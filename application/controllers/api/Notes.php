<?php


require APPPATH . '/libraries/REST_Controller.php';

class Notes extends REST_Controller {

    function __construct() {
        parent::__construct();
    }

    function index_get(){
        $id = $this->get('user_id');
        $notes = $this->Notes_model->get_notes($id);
        $status = $this->Notes_model->check_error();
        if ($status['status'] == 'success') {
            $this->response($notes, 200);
        } else {
            $this->response($status, 200);
        }
    }

    function index_post(){
        //const newNote = {id: uuidv4(), selected: true, title: name, category, date, content: "Let's Write!"};
        $data = array(
            "id" => $this->post("id"),
            "title" => $this->post("title"),
            "content" => $this->post("content"),
            "category" => $this->post("category"),
            "date" => $this->post("date"),
            "user_id" => $this->post("user_id"),
        );
        if ($this->post("update")) {
            $result = $this->Notes_model->update_note($data);
        } else {
            $result = $this->Notes_model->add_note($data);
        }
        if ($result['status'] == "success") {
            $this->response($result, 201);
        } else {
            $this->response($result, 200);
        }
    }

    public function index_delete($id){
        $result = $this->Notes_model->delete_note($id);
        if ($result["status"] == "success") {
            $this->response($result, 201);
        } else {
            $this->response($result, 200);
        }
    }

}