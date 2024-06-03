

const Loading = () => {
  return (
    <div className="flex items-center gap-2">
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce "></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce animation-delay-75"></div>
        <div className="w-3 h-3 bg-gray-600 rounded-full animate-bounce animation-delay-100"></div>
    </div>
  )
}

export default Loading;