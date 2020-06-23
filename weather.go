package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	// Shortening the import reference name seems to make it a bit easier
)

var url = "https://api.openweathermap.org/data/2.5/onecall?lat=34.156880&lon=-118.487430&appid=407e0bd6db4f2f0f44c6a3d0208adc04"
var apiKey = "407e0bd6db4f2f0f44c6a3d0208adc04"

type Hourly struct {
	Clouds   int     `json:"clouds"`
	DewPoint float64 `json:"dew-point"`
}

// forecast body from api
type Forcast struct {
	Hourly []map[string]interface{} `json:"hourly"`
}

func main() {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		panic(err)
	}

	fmt.Println(req)

	res, _ := http.DefaultClient.Do(req)
	if err != nil {
		panic(err)
	}

	defer res.Body.Close()
	body, _ := ioutil.ReadAll(res.Body)

	var convert Forcast

	fmt.Println(string(body))

	json.Unmarshal([]byte(body), &convert)

	// fmt.Println(len(convert.Hourly))
	fmt.Println(convert)

	for _, hour := range convert.Hourly {
		// fmt.Println(convert.Hourly[i])
		fmt.Println(hour)
		// fmt.Println(hour.DewPoint)
	}

	// fmt.Println(convert["hourly"])

	// sBody := string(body)

	// fmt.Println(convert["hourly"])

	ip, err := externalIP()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(ip)

}

func externalIP() (string, error) {
	ifaces, err := net.Interfaces()
	if err != nil {
		return "", err
	}
	for _, iface := range ifaces {
		if iface.Flags&net.FlagUp == 0 {
			continue // interface down
		}
		if iface.Flags&net.FlagLoopback != 0 {
			continue // loopback interface
		}
		addrs, err := iface.Addrs()
		if err != nil {
			return "", err
		}
		for _, addr := range addrs {
			var ip net.IP
			switch v := addr.(type) {
			case *net.IPNet:
				ip = v.IP
			case *net.IPAddr:
				ip = v.IP
			}
			if ip == nil || ip.IsLoopback() {
				continue
			}
			ip = ip.To4()
			if ip == nil {
				continue // not an ipv4 address
			}
			return ip.String(), nil
		}
	}
	return "", errors.New("are you connected to the network?")
}
