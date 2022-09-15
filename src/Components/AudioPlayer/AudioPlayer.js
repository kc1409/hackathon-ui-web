import React, { useState, useEffect, useRef } from "react";
import AudioControls from "./AudioControls";
import Backdrop from "./Backdrop";
import "./styles.css";
import { Container, Drawer } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Fab } from "@material-ui/core";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

/*
 * Read the blog post here:
 * https://letsbuildui.dev/articles/building-an-audio-player-with-react-hooks
 */
const AudioPlayer = ({ tracks }) => {
  // State
  const [trackIndex, setTrackIndex] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState("");
  const [showTextField, setShowTextField] = useState(false);
  const [showAudioField, setShowAudioField] = useState(false);
  const [textOpen, setTextOpen] = React.useState(true);
  const [textField, setTextField] = React.useState(true);

  const [audioOpen, setAudioOpen] = React.useState(true);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [quizResponse, setQuizResponse] = React.useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));

  // Destructure for conciseness
  const { title, artist, color, image, audioSrc } = tracks[trackIndex];

  // Refs
  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const handleTextOpen = () => {
    setTextOpen(true);
  };

  const handleTextClose = () => {
    setTextOpen(false);
    setShowTextField(false);
  };

  const handleAudioOpen = () => {
    setAudioOpen(true);
  };

  const handleAudioClose = () => {
    setAudioOpen(false);
    setShowAudioField(false);
  };

  const handleQuizOpen = () => {
    setShowQuiz(true);
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
  };

  const handleRadioButtonChange = (e) => {
    setQuizResponse(e.target.value);
    console.log(quizResponse);
  };

  // Destructure for conciseness
  const { duration } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handles cleanup and setup when changing tracks
  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      // Set the isReady ref as true for the next pass
      isReady.current = true;
    }
  }, [trackIndex]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player-main">
      <div>
        <div
          style={{ marginTop: "100px", backgroundColor: "#576490" }}
          className="audio-player"
        >
          <div className="track-info">
            <img
              className="artwork"
              src={image}
              alt={`track artwork for ${title} by ${artist}`}
            />
            <h2 className="title">{title}</h2>
            <h3 className="artist">{artist}</h3>
            <AudioControls
              isPlaying={isPlaying}
              onPrevClick={toPrevTrack}
              onNextClick={toNextTrack}
              onPlayPauseClick={setIsPlaying}
            />
            <input
              type="range"
              value={trackProgress}
              step="1"
              min="0"
              max={duration ? duration : `${duration}`}
              className="progress"
              onChange={(e) => onScrub(e.target.value)}
              onMouseUp={onScrubEnd}
              onKeyUp={onScrubEnd}
              style={{ background: trackStyling }}
            />
          </div>
          <Backdrop
            trackIndex={trackIndex}
            activeColor={color}
            isPlaying={isPlaying}
          />
        </div>

        <Container
          style={{ paddingTop: "50px", justifyContent: "space-between" }}
        >
          <Button style={{ marginRight: "5px" }} variant="outlined">
            Quiz!
          </Button>
          <Button style={{ marginRight: "5px" }} variant="outlined" onClick={() => { setShowTextField(true)}}>
            Write?
          </Button>
          <Button style={{ marginRight: "5px" }} variant="outlined" onClick={() => { setShowAudioField(true)}}>
            Speak away!
          </Button>
        </Container>
      </div>
      {showTextField &&
          <div className="dialog-box">
          <Dialog open={handleTextOpen} onClose={handleTextClose}>
            <DialogTitle>Tell us how you feel :)</DialogTitle>
            <DialogContent>
              <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Write here..."
                  variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleTextClose}>Cancel</Button>
              <Button onClick={handleTextClose}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {showAudioField && (
        <div className="dialog-box">
          <Dialog
            open={handleAudioOpen}
            onClose={handleAudioClose}
            fullWidth={true}
          >
            <DialogTitle>Tell us how you feel :)</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Speak here..."
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleAudioClose}>Cancel</Button>
              <Button onClick={handleAudioClose}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {showQuiz && (
        <div className="dialog-box">
          <Dialog
            open={handleQuizOpen}
            onClose={handleQuizClose}
            fullWidth={true}
          >
            <Container
              style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                alignContent: "center",
                paddingTop: 15,
                flexDirection: "row",
                backgroundColor: "#D1D2F9",
              }}
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14, paddingTop: 4 }}
                  color="text.primary"
                  gutterBottom
                >
                  Is SAIL the best app for Mental Health ?
                </Typography>
              </CardContent>
              <FormControl
                style={{ paddingLeft: "55px", justifyContent: "space-between" }}
              >
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="True"
                    onChange={(e) => {
                      handleRadioButtonChange(e);
                    }}
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="False"
                    onChange={(e) => {
                      handleRadioButtonChange(e);
                    }}
                  />
                </RadioGroup>
              </FormControl>
              <CardActions
                style={{
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  alignContent: "center",
                  paddingTop: 15,
                }}
              ></CardActions>
            </Container>
            <DialogActions style={{ backgroundColor: "#D1D2F9" }}>
              <Button onClick={handleQuizOpen}>Cancel</Button>
              <Button onClick={handleQuizClose}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
