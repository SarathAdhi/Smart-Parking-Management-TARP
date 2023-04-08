#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClient.h>
#include <Firebase_ESP_Client.h>
#include <Servo.h> // servo library  

#define API_KEY "AIzaSyA8luB7054SxkbvUW-7OBbY97crGps5TL8"
#define DATABASE_URL "https://smart-parking-4db41-default-rtdb.firebaseio.com/"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

Servo gate1;

const char* ssid = "Oneplus1";
const char* password = "oneplus1";

int inputPin1_1 = 16, val1_1 = 0, temp1_1 = 0; // D0 choose input pin (for Infrared sensor)
int inputPin1_2 = 5, val1_2 = 0, temp1_2 = 0; // D1 choose input pin (for Infrared sensor)
int inputPin1_3 = 4, val1_3 = 0, temp1_3 = 0; // D2 choose input pin (for Infrared sensor)

int inputPin2_3 = 14, val2_1 = 0, temp2_1 = 0; // D5 choose input pin (for Infrared sensor)
int inputPin2_2 = 12, val2_2 = 0, temp2_2 = 0; // D6 choose input pin (for Infrared sensor)
int inputPin2_1 = 13, val2_3 = 0, temp2_3 = 0; // D7 choose input pin (for Infrared sensor)

int count = 0;
bool signupOK = false;

void setup() {
  Serial.begin(115200);
  
  pinMode(inputPin1_1, INPUT);
  pinMode(inputPin1_2, INPUT);
  pinMode(inputPin1_3, INPUT);

  pinMode(inputPin2_1, INPUT);
  pinMode(inputPin2_2, INPUT);
  pinMode(inputPin2_3, INPUT);

  gate1.attach(0);    //D4
  gate1.write(0);

  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
 
  config.api_key = API_KEY;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Sign up */
  if (Firebase.signUp(&config, &auth, "", "")){
    Serial.println("ok");
    signupOK = true;
  }
  else{
    Serial.printf("%s\n", config.signer.signupError.message.c_str());
  }
  
  Firebase.begin(&config, &auth);
  Firebase.reconnectWiFi(true);
}

void writeInFirebaseBool(String floor, String id, bool value = false) {
  if (Firebase.RTDB.setBool(&fbdo, "slot/" + floor + "/" + id, value)){
        Serial.println("PASSED");
        Serial.println("PATH: " + fbdo.dataPath());
        Serial.println("TYPE: " + fbdo.dataType());
  }
  else {
     Serial.println("FAILED");
     Serial.println("REASON: " + fbdo.errorReason());
  }
}

void loop() {
    gate1.write(0);
    
    if(WiFi.status()== WL_CONNECTED) {
      val1_1 = digitalRead(inputPin1_1);
       val1_2 = digitalRead(inputPin1_2);
       val1_3 = digitalRead(inputPin1_3);
    
       val2_1 = digitalRead(inputPin2_1);
       val2_2 = digitalRead(inputPin2_2);
       val2_3 = digitalRead(inputPin2_3);

       if (Firebase.RTDB.getBool(&fbdo, "slot/gate1/isActive")) {
            int val = fbdo.boolData();
            Serial.println("data:- "+val);
            if (val == true) {
              gate1.write(180);
              
              delay(2000);

              gate1.write(0);

              writeInFirebaseBool("gate1", "isActive", false);
            }
      }
   
      if (val1_1 == LOW && temp1_1 != LOW) {
         temp1_1 = LOW;
         Serial.println("Slot occupied - 1,1");
         writeInFirebaseBool("first", "1/isOccupied", true);
      } else if (val1_1 == HIGH && temp1_1 != HIGH) {
         temp1_1 = HIGH;
         Serial.println("Slot free - 1,1");
         writeInFirebaseBool("first", "1/isOccupied");
         writeInFirebaseBool("first", "1/isReserved");
      }
       
      if (val1_2 == LOW && temp1_2 != LOW) {
         temp1_2 = LOW;
         Serial.println("Slot occupied - 1,2");
         writeInFirebaseBool("first", "2/isOccupied", true);
      } else if (val1_2 == HIGH && temp1_2 != HIGH) {
         temp1_2 = HIGH;
         Serial.println("Slot free - 1,2");
         writeInFirebaseBool("first", "2/isOccupied");
         writeInFirebaseBool("first", "2/isReserved");
      }
       
      if (val1_3 == LOW && temp1_3 != LOW) {
         temp1_3 = LOW;
         Serial.println("Slot occupied - 1,3");
         writeInFirebaseBool("first", "3/isOccupied", true);
      } else if (val1_3 == HIGH && temp1_3 != HIGH) {
         temp1_3 = HIGH;
         Serial.println("Slot free - 1,3");
         writeInFirebaseBool("first", "3/isOccupied");
         writeInFirebaseBool("first", "3/isReserved");
      }
    
    //   Check for second floor
      if (val2_1 == LOW && temp2_1 != LOW) {
         temp2_1 = LOW;
         Serial.println("Slot occupied - 2,1");
         writeInFirebaseBool("second", "1/isOccupied", true);
      } else if (val2_1 == HIGH && temp2_1 != HIGH) {
         temp2_1 = HIGH;
         Serial.println("Slot free - 2,1");
         writeInFirebaseBool("second", "1/isOccupied");
         writeInFirebaseBool("second", "1/isReserved");
      }
       
      if (val2_2 == LOW && temp2_2 != LOW) {
         temp2_2 = LOW;
         Serial.println("Slot occupied - 2,2");
         writeInFirebaseBool("second", "2/isOccupied", true);
      } else if (val2_2 == HIGH && temp2_2 != HIGH) {
         temp2_2 = HIGH;
         Serial.println("Slot free - 2,2");
         writeInFirebaseBool("second", "2/isOccupied");
         writeInFirebaseBool("second", "2/isReserved");
      }
       
      if (val2_3 == LOW && temp2_3 != LOW) {
         temp2_3 = LOW;
         Serial.println("Slot occupied - 2,3");
         writeInFirebaseBool("second", "3/isOccupied", true);
      } else if (val2_3 == HIGH && temp2_3 != HIGH) {
         temp2_3 = HIGH;
         Serial.println("Slot free - 2,3");
         writeInFirebaseBool("second", "3/isOccupied");
         writeInFirebaseBool("second", "3/isReserved");
      }
    }
    else {
      Serial.println("WiFi Disconnected");
    }

    delay(1000);
}
