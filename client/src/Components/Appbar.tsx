import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../store/authState";

const Appbar = () => {
  const authStateValue = useRecoilValue(authState);
  //   console.log(authStateValue);
  const navigate = useNavigate();

  return (
    <div>
      {!authStateValue.username ? (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "25px",
            marginRight: "25px",
            marginTop: "20px",
          }}
        >
          <div
            style={{ display: "flex", gap: "10px", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10023/10023840.png"
              width={"45px"}
            ></img>
            <Typography
              variant="h5"
              style={{ display: "flex", alignItems: "center" }}
            >
              {"<w0w-todo />"}
            </Typography>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <div>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </Button>
            </div>

            <div>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Signin
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "25px",
            marginRight: "25px",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10023/10023840.png"
              width={"50px"}
              height={"57px"}
            ></img>
            <Typography
              variant="h5"
              style={{ display: "flex", alignItems: "center" }}
            >
              {"<w0w-todo />"}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
            }}
          >
            <h2>Welcome </h2>
            <h2>{`<${authStateValue.username.split("@")[0]} />`}</h2>
          </div>
          <div
            style={{
              marginTop: 15,
              marginLeft: 20,
            }}
          >
            {/* <div>
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/addTodo");
                }}
              >
                Create Todo
              </Button>
            </div>
            <div>
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/todos");
                }}
              >
                All Todos
              </Button>
            </div> */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appbar;
