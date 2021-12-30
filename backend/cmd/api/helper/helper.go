package helper

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func viperEnvVariable(key string) string {

	// SetConfigFile explicitly defines the path, name and extension of the config file.
	// Viper will use this and not check any of the config paths.
	// .env - It will search for the .env file in the current directory
	viper.SetConfigFile(".env")
  
	// Find and read the config file
	err := viper.ReadInConfig()
  
	if err != nil {
	  log.Fatalf("Error while reading config file %s", err)
	}
  
	// viper.Get() returns an empty interface{}
	// to get the underlying type of the key,
	// we have to do the type assertion, we know the underlying value is string
	// if we type assert to other type it will throw an error
	value, ok := viper.Get(key).(string)
  
	// If the type is a string then ok will be true
	// ok will make sure the program not break
	if !ok {
	  log.Fatalf("Invalid type assertion")
	}
  
	return value
  }

func ConnectDB() *mongo.Client {
	viperenv := viperEnvVariable("MONGO_DB_URI")
	
	clientOptions := options.Client().ApplyURI(viperenv)
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Connected to MongoDB!")

	// temporary seed data 

	// priorityCollection := client.Database("cvwo_rest_api").Collection("priorities")



	// docs := []interface{}{
    //     bson.D{{"_id", 1}, {"description", "Low"}},
    //     bson.D{{"_id", 2}, {"description", "Medium"}},
    //     bson.D{{"_id", 3}, {"description", "High"}},
    // }

	// result, err := priorityCollection.InsertMany(context.TODO(), docs)
	// list_ids := result.InsertedIDs
	// if err != nil {
	// 		fmt.Printf("A bulk write error occurred, but %v documents were still inserted.\n", len(list_ids))
	// }
	// for _, id := range list_ids {
	// 		fmt.Printf("Inserted document with _id: %v\n", id)
	// }

	// --------------------------- // 

	// collection := client.Database("cvwo_rest_api").Collection("tasks")

	return client
	}

type ErrorResponse struct {
	StatusCode   int    `json:"status"`
	ErrorMessage string `json:"message"`
}

func GetError(err error, w http.ResponseWriter) {

	log.Fatal(err.Error())
	var response = ErrorResponse{
		ErrorMessage: err.Error(),
		StatusCode:   http.StatusInternalServerError,
	}

	message, _ := json.Marshal(response)

	w.WriteHeader(response.StatusCode)
	w.Write(message)
}