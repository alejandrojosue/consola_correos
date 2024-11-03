import Record from './record.js';

export default class Records {
 _list = {}
 get listArr() {
  const list = []
  Object.keys(this._list).forEach(key => {
   const record = this._list[key]
   list.push(record)
  })
  return list
 }

 constructor() {
  this._list = {}
 }

 create(desc = '') {
  const record = new Record(desc)
  this._list[record.id] = record
 }

 getAll() {
  const records = this.listArr
  console.log();
  if (!records.length) {
   console.log('No hay registros'.red)
   return
  }
  records.forEach((record, index) => {
   const id = `${index + 1}`.green
   const { desc, dateTime } = record
   console.log(`${id}.`.green + ` ${desc.gray} :: ${dateTime}`);
  })
  console.log();
 }

 loadRecordsFromArr(records = []) {
  records.forEach(record => {
   this._list[record.id] = record
  })
 }
}