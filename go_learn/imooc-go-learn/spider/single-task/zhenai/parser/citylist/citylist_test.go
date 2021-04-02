package citylist

import (
	"io/ioutil"
	"testing"
)

func TestParserCityList(t *testing.T) {
	//contents, err := fetcher.Fetch("http://www.zhenai.com/zhenghun")
	contents, err := ioutil.ReadFile("citylist_test_data.html")
	if err != nil {
		panic(err)
	}

	parseResult := ParserCityList(contents)

	const resultSize = 470

	expectedUrls := []string{
	  "http://www.zhenai.com/zhenghun/aba",
	  "http://www.zhenai.com/zhenghun/akesu",
	  "http://www.zhenai.com/zhenghun/alashanmeng",
	}

	expectedCitys := []string{
		"阿坝", "阿克苏", "阿拉善盟",
	}

	if len(parseResult.Requests) != resultSize {
		t.Errorf("result should have %d requests, but has %d", resultSize, len(parseResult.Requests))
	}

	if len(parseResult.Items) != resultSize {
		t.Errorf("result should have %d items, but has %d", resultSize, len(parseResult.Items))
	}

	for i, url := range expectedUrls {
		if parseResult.Requests[i].Url != url {
			t.Errorf("result should have %s request, but has %s", url, parseResult.Requests[i].Url)
		}
	}

	for i, city := range expectedCitys {
		if parseResult.Items[i] != city {
			t.Errorf("result should have %s item, but has %s", city, parseResult.Items[i])
		}
	}
}