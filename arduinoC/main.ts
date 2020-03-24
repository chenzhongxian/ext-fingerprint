enum BAUDRATE {
  //% block="57600"
  57600,
  //% block="9600"
  9600,
  //% block="115200"
  115200
}

enum ACT {
  //% block="verifyPassword"
  verifyPassword,
  //% block="getImage"
  getImage,
  //% block="createModel"
  createModel,
  //% block="getModel"
  getModel,
  //% block="emptyDatabase"
  emptyDatabase,
  //% block="fingerFastSearch"
  fingerFastSearch,
  //% block="getTemplateCount"
  getTemplateCount,
  //% block="fingerID"
  fingerID,
  //% block="confidence"
  confidence,
  //% block="templateCount"
  templateCount
}

//% color="#fc4040" iconWidth=40 iconHeight=40
namespace fingerprint {
  //% block="fingerprint sensor initliallize pin [SSER] RX [SSRXD] TX [SSTXD] baudrate [BAUDRATE] blockType="command"
  //% SSER.shadow="dropdown" SSER.options="SSER"
  //% SSTXD.shadow="dropdown" SSTXD.options="SSTXD"
  //% SSRXD.shadow="dropdown" SSRXD.options="SSRXD"
  //% BAUDRATE.shadow="dropdown" BAUDRATE.options="BAUDRATE"
  export function beginSoftSerial(parameter: any, block: any) {
    let tx = parameter.SSTXD.code;
    let rx = parameter.SSRXD.code;
    let sser = "finger" + parameter.SSER.code;
    let baudrate = parameter.BAUDRATE.code;
    // let password = parameter.PASSWORD.code;
    Generator.addInclude(
      "includeFingerprint",
      "#include <Adafruit_Fingerprint.h>"
    );
    Generator.addInclude("includesoftSerial", "#include <SoftwareSerial.h>");
    Generator.addObject(
      "softSerialObject",
      "SoftwareSerial",
      `${sser}(${rx}, ${tx});`
    );
    Generator.addObject(
      "FingerObject",
      "Adafruit_Fingerprint",
      `finger = Adafruit_Fingerprint(&${sser});`
    );
    Generator.addSetup("FingerSoftSerialSetup", `finger.begin(${baudrate});`);
  }

  //% block="fingerprint sensor initliallize pin [SER] RX [RXD] TX [TXD] baudrate [BAUDRATE]" blockType="command"
  //% SER.shadow="dropdown" SER.options="SER"
  //% RXD.shadow="dropdown" RXD.options="RXD"
  //% TXD.shadow="dropdown" TXD.options="TXD"
  //% BAUDRATE.shadow="dropdown" BAUDRATE.options="BAUDRATE"
  export function beginSerial(parameter: any, block: any) {
    let ser = parameter.SER.code;
    let rx = parameter.RXD.code;
    let tx = parameter.TXD.code;
    let baudrate = parameter.BAUDRATE.code;
    Generator.addInclude(
      "includeFingerprint",
      "#include <Adafruit_Fingerprint.h>"
    );
    Generator.addObject(
      "FingerObject",
      "Adafruit_Fingerprint",
      `finger = Adafruit_Fingerprint(&${ser});`
    );
    if (Generator.board === "arduino") {
      Generator.addSetup("FingerSerialSetup", `finger.begin(${baudrate});`);
    } else if (Generator.board === "arduinonano") {
      Generator.addSetup("FingerSerialSetup", `finger.begin(${baudrate});`);
    } else if (Generator.board === "leonardo") {
      Generator.addSetup("FingerSerialSetup", `finger.begin(${baudrate});`);
    } else if (Generator.board === "mega2560") {
      Generator.addSetup("FingerSerialSetup", `finger.begin(${baudrate});`);
    } else if (Generator.board === "arduinounor3") {
      Generator.addSetup("FingerSerialSetup", `finger.begin(${baudrate});`);
    } else if (Generator.board === "microbit") {
      Generator.addSetup(
        "FingerSerialSetup",
        `finger.begin(${baudrate}, ${rx}, ${tx});`
      );
    } else if (Generator.board === "esp32") {
      Generator.addSetup(
        "FingerSerialSetup",
        `finger.begin(${baudrate}, ${rx}, ${tx});`
      );
    }
  }

  //% block="finger getFinger success?" blockType="boolean"
  export function getFingerSuccess() {
    Generator.addCode(
      "(finger.getImage() == FINGERPRINT_OK) && (finger.image2Tz() == FINGERPRINT_OK) && (finger.fingerFastSearch() == FINGERPRINT_OK)"
    );
  }

  //% block="fingerID" blockType="reporter"
  export function fingerID() {
    Generator.addCode(
      "finger.fingerID"
    );
  }

  // //% block="finger getImage success?" blockType="boolean"
  // export function getImageSuccess() {
  //   Generator.addCode("finger.getImage() == FINGERPRINT_OK");
  // }

  // //% block="finger image2Tz success?" blockType="boolean"
  // export function image2TzSuccess() {
  //   Generator.addCode("finger.image2Tz() == FINGERPRINT_OK");
  // }

  // //% block="finger fingerFastSearch success?" blockType="boolean"
  // export function fingerFastSearchSuccess() {
  //   Generator.addCode("finger.fingerFastSearch() == FINGERPRINT_OK");
  // }
}
