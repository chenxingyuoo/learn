package ffmpegw

import (
	"errors"
	"fmt"
	"crypto/md5"
	"io/ioutil"
	"os"
	"os/exec"

	//"io/ioutil"
	"html/template"
	//"os"
	//"errors"
	"strings"
)

type Subs struct {
	subs []string
}

func (s *Subs) Append(sub interface{}) *Subs {
	switch sub.(type) {
	case string:
		s.subs = append(s.subs, sub.(string))
	case []string:
		tmpSlice := sub.([]string)
		for i := 0; i < len(tmpSlice); i++ {
			s.subs = append(s.subs, tmpSlice[i])
		}
	}
	return s
}

func (s *Subs) EntrySet() []string {
	return s.subs
}

func (s *Subs) Hash(prefix string) string {
	md5Buf := md5.Sum([]byte(prefix + strings.Join(s.EntrySet(), ",")))
	return fmt.Sprintf("%x", md5Buf[:])
}

func MakeGif(tplKey string, subs Subs) (string, error) {
	return GenerateResource(tplKey, subs, "gif")
}
func MakeMp4(tplKey string, subs Subs) (string, error) {
	return GenerateResource(tplKey, subs, "mp4")
}

func CopyMp4() error {
	var cmd = &exec.Cmd{}
	cmd = exec.Command("ffmpeg", "-i", "./video/10.09s.mp4",
		"-c",
		"copy",
		"./video/output.mkv")

	if _, err := cmd.CombinedOutput(); err != nil {
		return err
	}
}


// GenerateResource Generate resources(gif/mp4)
// ffmpeg CLI wrapper
func GenerateResource(tplKey string, subs Subs, resType string) (hash string, err error) {
	tplPath := fmt.Sprintf("./video/%s", tplKey)
	videoTplFile := tplPath + "/10.09s.mp4"
	subTplFile := tplPath + "/template.ass"

	hash = subs.Hash(tplKey)
	subOutputFile := fmt.Sprintf("./dist/%s", hash)
	outputResource := "dist/" + hash + "." + resType
	if _, err = os.Stat(outputResource); os.IsNotExist(err) {
		tplText := ""
		if tmpBuf, err := ioutil.ReadFile(subTplFile); err != nil {
			return hash, err
		} else {
			tplText = string(tmpBuf)
		}
		tpl := template.New("subTitle")
		if tpl, err = tpl.Parse(tplText); err != nil {
			return
		} else {
			if f, err := os.Create(subOutputFile); err != nil {
				return hash, err
			} else {
				data := map[string][]string{
					"sentences": subs.EntrySet(),
				}
				if err = tpl.Execute(f, data); err != nil {
					return hash, err
				}
			}
		}
		var cmd = &exec.Cmd{}
		switch resType {
		case "gif":
			cmd = exec.Command("ffmpeg", "-i", videoTplFile,
				"-vf", fmt.Sprintf("ass=%s,scale=300:-1", subOutputFile),
				"-r", "8",
				"-y", outputResource)
		case "mp4":
			cmd = exec.Command("ffmpeg", "-i", videoTplFile,
				"-vf", fmt.Sprintf("ass=%s", subOutputFile),
				"-an",
				"-y", outputResource)
		default:
			return "", errors.New("Unknown resType: " + resType)
		}
		if _, err := cmd.CombinedOutput(); err != nil {
			return hash, err
		}
	} else {
		return
	}
	return
}