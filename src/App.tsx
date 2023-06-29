import { Main } from "pages/Main"
import { Preloader } from "components/preloader/Preloader"
import { Sidebar } from "components/sidebar/Sidebar"
import { Toast } from "./components/base/Toast"
import { useAppSelector } from "./store"

function App() {

  const { error } = useAppSelector((state)=>state.map)
  
  return (
      <div>
          <Preloader />
          <Sidebar />
          <Main />
          {error && <Toast text={error} />}
      </div>
  );
}

export default App
