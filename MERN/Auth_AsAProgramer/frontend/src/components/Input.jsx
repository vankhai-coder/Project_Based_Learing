import { useState } from "react"

const Input = ({ icon: Icon, eyeOpen: EyeOpen, eyeClose: EyeClose, ...props }) => {

    const [isHide, setIsHide] = useState(EyeClose)
    return (
        <div className="relative mb-6">
            {/* icon : */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 
            pointer-events-none">
                <Icon className="size-5 text-green-500" />
            </div>
            {/* input field : */}
            <input
                {...props}
                required
                type={isHide ? 'password' : 'text'}
                className="w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg 
                border border-gray-700 focus:border-green-500 focus:ring-2
                 focus:ring-green-500 text-white placeholder-gray-400 
                 transition duration-200"
            />
            {/* eye in password : */}
            {EyeOpen &&
                <div className="absolute inset-y-0 right-0 flex items-center mr-4">
                    {isHide ?
                        (<EyeClose className="text-green-500" onClick={() => {
                            setIsHide(false)
                        }} />)
                        :
                        (<EyeOpen className="text-green-500" onClick={() => {
                            setIsHide(true)
                        }} />)
                    }

                </div>
            }
        </div>
    )
}

export default Input