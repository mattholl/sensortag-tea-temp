// var notify = require("osx-notifier"),
var SensorTag = require("sensortag");
var notifier = require('node-notifier');
var nc = new notifier.NotificationCenter();

SensorTag.discover(function(sensorTag) {
    console.log(sensorTag);

    sensorTag.connect(function() {
        sensorTag.discoverServicesAndCharacteristics(function(){
            sensorTag.on('notifySimpleKey', function(left, right) {
                 console.log(left, right);
            });
            sensorTag.on('simpleKeyChange', function(left, right) {
                 console.log(left, right);
            });
            sensorTag.enableIrTemperature();
            sensorTag.notifyIrTemperature(function(objTemp, ambTemp) {
                console.log('object temp : ' + objTemp);
                console.log('ambient temp : ' + ambTemp);
            });
            sensorTag.on('irTemperatureChange', function(objTemp, ambTemp) {
                console.log('object temp : ' + objTemp);
                console.log('ambient temp : ' + ambTemp);
                sensorTag._peripheral.updateRssi();
                console.log(sensorTag._peripheral.rssi);
            });
            sensorTag.notifySimpleKey(function() {
                console.log('simplekey notify correctly set up');
            });
            // sensorTag._peripheral._noble.updateRssi();
            // sensorTag._peripheral._noble.on('rssiUpdate', function(rssi) {
            //     console.log('rssi : ' + rssi);
            // });
            console.log(sensorTag._peripheral.rssi);
        });
    });

    sensorTag.on('simpleKeyChange', function(left, right) {
        if (left) {
            var temp = 45;
            notify({
              type: 'info',
              title: 'tea\'s ready',
              subtitle: 'Task completed',
              message: 'Took ' + temp + ' seconds.',
              group: 'taskdoer',
            });

        } else if (right) {
          console.log('right pressed');
          nc.notify({
              title: 'My awesome title',
              message: 'Hello from node, Mr. User!',
              //icon: path.join(__dirname, 'coulson.jpg'), // absolute path (not balloons)
              sound: 'Pop', // Only Notification Center or Windows Toasters
              wait: true // wait with callback until user action is taken on notification
            }, function (err, response) {
              // response is response from notification
            });
        }
    });

});
