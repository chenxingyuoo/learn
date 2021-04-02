package main

import "testing"

func TestTriangle(t *testing.T)  {
	tests := []struct{a, b, c int}{
		{3, 4, 5},
		{6, 12, 13},
		{10, 15, 18},
		{3000, 4000, 5000},
	}

	for _, tt := range tests {
		if actual := calcTriangle(tt.a, tt.b); actual != tt.c {
			t.Errorf("calcTriangle(%d, %d); "+
				"got %d; expected %d",
				tt.a, tt.b, actual, tt.c)
		}
	}
}