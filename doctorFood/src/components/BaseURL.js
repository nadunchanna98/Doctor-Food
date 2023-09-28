import { Platform } from "react-native";
let BASE_URL = "";

if (Platform.OS === "android") {
     BASE_URL = "http://192.168.28.74:3000/api/v1/" 
} 

export default BASE_URL;