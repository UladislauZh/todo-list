import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>(); // для экшенов и санок, т.к. обычноый диспатч только экшены может возвращать
