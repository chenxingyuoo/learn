import Firebase from 'firebase/app'
import 'firebase/database'

const config = {
  databaseURL: 'https://test-9dc88.firebaseio.com'
}
const version = '/v0'

Firebase.initializeApp(config)
const api = Firebase.database().ref()
export default api