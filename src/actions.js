import axios from "axios";
import { toast } from "react-toastify";

export const NOT_EKLE = "NOT_EKLE";
export const NOT_SIL = "NOT_SIL";

export function notEkle(not) {
  // ...
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  // ...
  return { type: NOT_SIL, payload: notId };
}

export const notEkleAPI = (yeniNot) => (dispatch) => {
  const toasterEkle = toast.loading("Please wait... Ekliyor");

  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        console.log("Not ekle api res", res);
        toast.update(toasterEkle, {
          render: "All is good",
          type: "success",
          isLoading: false,
          autoClose: 2000,
        });
        dispatch(notEkle(res.data.json));
      }
    })
    .catch((error) => console.log(error));
};

export const notSilAPI = (id) => (dispatch) => {
  const toasterSil = toast.loading("Please wait... Siliyor");

  console.log(id);
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        console.log("Not sil api res", res);
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin
        dispatch(notSil(res.data.data));
        toast.update(toasterSil, {
          render: "Notes deleted",
          type: "warning",
          isLoading: false,
          autoClose: 2000,
        });
      }
    })
    .catch((error) => console.log(error));
};
