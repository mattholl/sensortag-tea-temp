# sensortag-tea-temp
Using a [Texas Instruments BLE SensorTag](http://www.ti.com/ww/en/wireless_connectivity/sensortag/index.shtml?INTC=SensorTag&HQS=sensortag) to check when your tea cools to a drinkable  temperature.

Place the SensorTag as close the cup or teapot as possible with the infrared sensor pointing towards it.

Run
```
node tea-time.js
```

For some reason it needs to be run twice before it will connect.

When the object temperature falls to the correct value a desktop notification will fire. Adjust the ideal temperature variable to taste.