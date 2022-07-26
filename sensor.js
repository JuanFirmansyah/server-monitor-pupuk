const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://admin:admin@monitor.aawfx.mongodb.net/db_monitor?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const dataSchema = new mongoose.Schema({
  name: String,
  volume: String,
  value: [
    {
      type: Number,
    },
  ],
});

const Data = mongoose.model('Data', dataSchema);

let name = [
  'Debit',
  'TSS',
  'pH',
  'NO3N',
  'P04',
  'NH3N',
  'TDS',
  'BOD5',
  'COD',
  'Fe',
  'Cu',
  'Cr',
];

let volume = [
  'm3/s',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
  'mg/L',
];

// kumpulan perintah-perintah di database

// cek semua data jika tidak ada di database maka jalankan function withOutData(), jika ada maka jalankan function hasData()
// Data.find({}, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else if (data.length === 0) {
//     withOutData();
//   } else {
//     hasData();
//   }
// });

// delete all data in database
// deleteAll();

// check data
// checkData();

// buatlah switch case pengkondisian di bawah

// cek jika data di database ada atau tidak
function checkData() {
  Data.find({}, function (err, data) {
    if (err) {
      console.log(err);
    } else if (data.length === 0) {
      console.log('Data tidak ada');
    } else {
      console.log('Data ada');
    }
  });
}

// run this function to start filling database
function withOutData() {
  dummyData();
  hasData();
}

// run this function if database is empty
function dummyData() {
  for (let i = 0; i < name.length; i++) {
    const data = new Data({
      name: name[i],
      volume: volume[i],
      value: [Math.floor(Math.random() * 200)],
    });
    data.save(function (err) {
      if (err) return console.error(err);
      console.log('Data saved successfully!');
    });
  }
}

// run this function if already data in database
function hasData() {
  // tiap 10 detik tambah data baru pada data value array menggunakan forEach
  setInterval(function () {
    Data.find({}, function (err, data) {
      if (err) return console.error(err);
      data.forEach(function (item) {
        item.value.push(Math.floor(Math.random() * 200));
        item.save(function (err) {
          if (err) return console.error(err);
          console.log('Data saved successfully!');
        });
      });
    });
  }, 10000);
}

// deleted all data
function deleteAll() {
  Data.deleteMany({}, function (err) {
    if (err) return console.error(err);
    console.log('Data deleted successfully!');
  });
}
