import Axios from "./Axios";

const FetchUsersDetails = async () => {
  try {
    const res = await Axios({
      method: "GET",
      url: "/api/user/user_detail",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    console.log("res of fetchuserdetails", res);
    if (!res) {
      console.log("No user found");
    }
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default FetchUsersDetails;
