package main

import "testing"

func TestSubstr(t *testing.T)  {
	tests := []struct{
		s string
		ans int
	} {
		{"abcabcbb", 3},
		{"bbbbb", 1},
		{"", 0},
		{"一二三二一", 3},
		{"黑化肥挥发发灰会花飞灰化肥挥发发黑会飞花", 8},
	}

	for _, tt := range tests {
		if actual := lengthOfNonRepeatingSubStr(tt.s); actual != tt.ans {
			t.Errorf("got %d for input %s; "+
				"expected %d",
				actual, tt.s, tt.ans)
		}
	}
}


func BenchmarkSubstr(b *testing.B)  {
	s := "黑化肥挥发发灰会花飞灰化肥挥发发黑会飞花"
	for i := 0; i < 13; i++ {
		s = s + s
	}
	b.Logf("len(s) = %d", len(s))
	ans := 8
	b.ResetTimer()

	for i := 0; i < b.N; i++ {
		if actual := lengthOfNonRepeatingSubStr(s); actual != ans {
			b.Errorf("got %d for input %s; "+
				"expected %d",
				actual, s, ans)
		}
	}
}