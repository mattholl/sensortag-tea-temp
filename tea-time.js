var SensorTag = require("sensortag");
var notifier = require('node-notifier');
var nc = new notifier.NotificationCenter();
var path = require('path');

var idealTemp = 45;

SensorTag.discover(function(sensorTag) {

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.enableIrTemperature();
            sensorTag.notifyIrTemperature(function() {});
        });
    });

    sensorTag.on('irTemperatureChange', function(objTemp, ambTemp) {

        if(objTemp < idealTemp) {
            nc.notify({
                title: 'Tee ist fertig!',
                message: 'The ideal temperature has been reached.',
                icon: path.join(__dirname, 'serving1.png'), // absolute path (not balloons)
                sound: 'Pop', // Only Notification Center or Windows Toasters
                wait: true // wait with callback until user action is taken on notification
            }, function() {
                console.log('Tee ist fertig!');
            }).on('click', function() {
                process.exit(0);
            });
        }
    });

});
