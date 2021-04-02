package db

import (
	"gopkg.in/mgo.v2"
)

type Collection struct {
	Name string
}

func ConnecToDB(col Collection) *mgo.Collection {
	session, err := mgo.Dial("127.0.0.1:27017")
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	collection := session.DB("mgo_test").C(col.Name)
	return collection
}
