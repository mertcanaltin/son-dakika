import TimeLine from "@/pages/components/timeLine"
import AlertElement from "@/pages/components/alert"

export default function Home() {
  return (
    <div className="container mx-auto mt-10">
      <AlertElement/>
      <div className="p-4 m-4">
        <TimeLine key={1} />
      </div>
    </div>
  )
}
