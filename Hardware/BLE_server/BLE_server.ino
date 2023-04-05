#include <WiFi.h>
#include <WebSocketClient.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID        "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

String station = "1";

const char* ssid     = "WiFi name";
const char* password = "WiFi password";
char path[] = "/";
char host[] = "192.168.1.10:8000";
WebSocketClient webSocketClient;
WiFiClient client;

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) {
      String data;
      std::string value = pCharacteristic->getValue();
  
      if (client.connected()) {
        
        webSocketClient.getData(data);
        if (data.length() > 0) {
          Serial.print("Received data: ");
          Serial.println(data);
        }
       
        if (value.length() > 0) {
          String newData = station + '-' + value.c_str()
          webSocketClient.sendData(newData.c_str());
        }
        
        Serial.println();
      } else {
        Serial.println("Client disconnected.");
        while (1) {
          // Hang on disconnect.
        }
      }
      
    }
};
void setup() {
  Serial.begin(9600);
  Serial.println("Starting BLE work!");
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  delay(5000);

  // Connect to the websocket server
  if (client.connect("192.168.1.10", 8000)) {
    Serial.println("Connected");
  } else {
    Serial.println("Connection failed.");
   while(1) {
      Hang on failure
   }
  }

  // Handshake with the server
  webSocketClient.path = path;
  webSocketClient.host = host;
  if (webSocketClient.handshake(client)) {
    Serial.println("Handshake successful");
  } else {
    Serial.println("Handshake failed.");
    while(1) {
      // Hang on failure
    }  
  }

  BLEDevice::init("stationX");
  BLEServer *pServer = BLEDevice::createServer();
  BLEService *pService = pServer->createService(SERVICE_UUID);
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(
                                         CHARACTERISTIC_UUID,
                                         BLECharacteristic::PROPERTY_READ |
                                         BLECharacteristic::PROPERTY_WRITE
                                       );
  pCharacteristic->setCallbacks(new MyCallbacks());

  
  pCharacteristic->setValue("It's BLE Server");
  pService->start();
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  // functions that help with iPhone connections issue
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();
  Serial.println("Characteristic defined! Now you can read it in your phone!");
}

void loop() {
  delay(2000); 
}
