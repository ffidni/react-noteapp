<?php

    class Notes_model extends CI_Model {

        public function __construct(){
            parent::__construct();
        }


        public function get_notes($id) {
            $this->db->select("notes.id, notes.title, notes.content, notes.category, notes.date")
            ->from("notes")
            ->join("users", "users.id = notes.user_id")
            ->where("notes.user_id", $id);
            $result = $this->db->get()->result();
            if ($result) {
                return $result;
            }
            return array("status" => "failed");
        }
        

        public function add_note($data) {
            $this->db->insert("notes", $data);
            if ($this->db->insert_id()) {
                return array("status" => "success");
            }
            return array("status" => "failed");
        }

        public function update_note($data) {
            unset($data['update']);
            $this->db->where("id", $data["id"]);
            $this->db->update("notes", $data);
            if ($this->db->affected_rows()) {
                return array("status" => "success");
            }
            return array("status" => "failed");
            

        }

        public function delete_note($id){
            $this->db->where("id", $id);
            $result = $this->db->delete("notes");
            if ($result) {
                return array("status" => "success");
            }
            return array("status" => "failed");
        }
    }