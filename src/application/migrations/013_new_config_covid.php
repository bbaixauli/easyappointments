<?php defined('BASEPATH') OR exit('No direct script access allowed');

/* ----------------------------------------------------------------------------
 * Easy!Appointments - Open Source Web Scheduler
 *
 * @package     EasyAppointments
 * @author      A.Tselegidis <alextselegidis@gmail.com>
 * @copyright   Copyright (c) 2013 - 2018, Alex Tselegidis
 * @license     http://opensource.org/licenses/GPL-3.0 - GPLv3
 * @link        http://easyappointments.org
 * @since       v1.1.0
 * ---------------------------------------------------------------------------- */

class Migration_New_config_covid extends CI_Migration {
    public function up()
    {
        $this->load->model('settings_model');

        try
        {
            $this->settings_model->get_setting('book_max_days');
        }
        catch (Exception $exception)
        {
            $this->settings_model->set_setting('book_max_days', '0');
        }
        try
        {
            $this->settings_model->get_setting('any_provider');
        }
        catch (Exception $exception)
        {
            $this->settings_model->set_setting('any_provider', '0');
        }
    }

    public function down()
    {
        $this->load->model('settings_model');

        $this->settings_model->remove_setting('book_max_days');
        $this->settings_model->remove_setting('any_provider');
    }
}
