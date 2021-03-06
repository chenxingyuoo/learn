// Package prometheus provides prometheus metrics via a http handler
package prometheus

import (
	"net/http"

	promhttp "github.com/prometheus/client_golang/prometheus/promhttp"
)

// MetricsWrapper prometheus
func MetricsWrapper(h http.Handler) http.Handler {
	ph := promhttp.Handler()
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/metrics" {
			ph.ServeHTTP(w, r)
			return
		}

		h.ServeHTTP(w, r)
	})
}
