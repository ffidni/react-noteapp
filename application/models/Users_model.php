<?php

    class Users_model extends CI_Model {

        public function __construct(){
            parent::__construct();
        }

        public function login($email, $password){
            $this->db->where("email", $email);
            $this->db->where("password", md5($password));
            $result = $this->db->get("users")->row();
            if ($result) {
                $_SESSION['account'] = $result;
                return $result;
            } else {
                return array("status" => "failed");
            }
        }


        public function register($data) {
            $this->db->where("email", $data["email"]);
            $result = $this->db->get("users")->row();
            if ($result) {
                return array("status" => "failed");
            }
            $this->db->insert("users", $data);
            return array("status" => "success");
        }

        public function get($type, $value) {
            $this->db->where($type, $type == 'password' ? md5($value) : $value);
            $result = $this->db->get("users")->row();
            if ($result) {
                return $result;
            }
            return array("status" => "failed");
        }

        public function update_field($field, $value, $user_id) {
            $this->db->where("id", $user_id);
            $this->db->update("users", array($field => $value));
            $affected = $this->db->affected_rows();
            if ($affected) {
                return array("status" => "success");
            }
            return array("status" => "Update failed.");
        }

        public function get_selected($id) {
            $this->db->select("selected_note");
            $this->db->where("id", $id);
            $result = $this->db->get("users")->result();
            if ($result) {
                return $result;
            }
            return array("status" => "Failed while getting selected note.");
        }

    }