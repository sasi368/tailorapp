import { Dimensions } from 'react-native';

//api urls
export const api_url = "https://tailorapp.smpcpmk.org.in"; 
export const img_url = "https://tailorapp.smpcpmk.org.in/uploads/service_images/";
export const show_branch = "/api/show_branches";
export const add_branches = "/api/add_branches";
export const show_branches = "/api/show_branches";

export const login = "/api/login"; 
export const add_employee = "/api/register";
export const show_users = "/api/show_users"; 
export const add_customer = "/api/add_customer";  
export const show_customers = "/api/show_customers";
export const show_customers_by_branch = "/api/show_customers_by_branch";
export const show_customers_by_code = "/api/show_customers_by_code";
export const customers_details = "/api/show_customer_details";
export const add_services = "/api/add_services";
export const show_services = "/api/show_services";
export const add_measurements = "/api/add_measurements";
export const show_all_measurements = "/api/show_all_measurements";
export const show_measurement_details = "/api/show_measurement_details";
export const show_count_by_date = "/api/show_measurements_by_date";
export const show_today_by_date = "/api/show_today_by_date";
export const add_tracking = "/api/add_tracking";
export const show_tracking_position = "/api/show_tracking_position";
export const show_all_status = "/api/show_all_status";
export const show_order_status = "/api/show_order_status";
export const update_measurement_position = "/api/update_measurement_position";

//Font Family
export const font_title = "TitilliumWeb-Bold";
export const font_description = "TitilliumWeb-Regular";

//images and lottie views 
export const profile_icon = require('.././assets/img/profile.png');
export const customer_icon = require('.././assets/img/man.png');
export const user = require('.././assets/img/woman.png'); 
export const branch_logo = require('.././assets/img/branch_logo.png');
export const sho = require('.././assets/img/shoulder.png');
export const sh = require('.././assets/img/hip.png');
export const arm_length = require('.././assets/img/arm_length.png');
export const chest = require('.././assets/img/chest.png');
export const armhole = require('.././assets/img/armhole.png');
export const backneck = require('.././assets/img/backneck.png');
export const frontneck = require('.././assets/img/frontneck.png');
export const shirt_length = require('.././assets/img/shirt_length.png');
export const cuff = require('.././assets/img/cuff.png');

export const splash_img = require('.././assets/json/splash.json'); 
export const no_data = require('.././assets/json/no_data.json'); 
export const please_wait = require('.././assets/json/please_wait.json'); 

//Size
export const screenHeight = Math.round(Dimensions.get('window').height);
export const screenWidth = Math.round(Dimensions.get('window').width);
export const height_40 = Math.round(40 / 100 * screenHeight);
export const height_45 = Math.round(45 / 100 * screenHeight);
export const height_50 = Math.round(50 / 100 * screenHeight);
export const height_60 = Math.round(60 / 100 * screenHeight);
export const height_70 = Math.round(70 / 100 * screenHeight);
export const height_35 = Math.round(35 / 100 * screenHeight);
export const height_20 = Math.round(20 / 100 * screenHeight);
export const height_30 = Math.round(30 / 100 * screenHeight);
export const width_80 = Math.round(80 / 100 * screenWidth);
export const width_40 = Math.round(40 / 100 * screenWidth);