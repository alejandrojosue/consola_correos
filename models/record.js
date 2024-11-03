import { v4 } from 'uuid'

export default class Record {
 id = ''
 desc = ''
 dateTime = ''
 constructor( desc = '' ) {
  this.id = v4()
  this.desc = desc 
  this.dateTime = new Date().toLocaleString()
 }
}