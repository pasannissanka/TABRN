import React from 'react';
import './Login.css';
import { ReactComponent as GithubSVG } from '../../svg/github.svg';
import { ReactComponent as GoogleSVG } from '../../svg/google.svg';
import { ReactComponent as TwitterSVG } from '../../svg/twitter.svg';

interface LoginProps {}

export const Login = (props: LoginProps) => {
  return (
    <>
      <div className="flex h-screen">
        <div className="bg-pattern flex-auto w-1/4 bg-gray-600"></div>
        <div className="flex-auto m-auto w-3/4 bg-white">
          <div className="container flex justify-center">
            <div>
              <div>
                <img
                  className="mx-auto w-auto h-12"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-center text-gray-900 text-3xl font-extrabold">
                  Sign in to your account
                </h2>
              </div>
              <div className="py-6">
                <button
                  type="submit"
                  className="px-4 py-2 w-full text-white text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-md focus:outline-none shadow transition-colors duration-300 focus:ring-4 focus:ring-blue-200"
                >
                  Log in
                </button>
              </div>
              <div className="flex flex-col space-y-5">
                <span className="flex items-center justify-center space-x-2">
                  <span className="w-14 h-px bg-gray-400"></span>
                  <span className="text-gray-500 font-normal">
                    or login with
                  </span>
                  <span className="w-14 h-px bg-gray-400"></span>
                </span>
                <div className="flex flex-col space-y-4">
                  <a
                    href="http://localhost:4001/auth/google/"
                    className="group flex items-center justify-center px-4 py-2 bg-white border border-blue-500 rounded-md focus:outline-none space-x-2 transition-colors duration-300"
                  >
                    <GoogleSVG className="w-5 h-5 text-gray-800 group-hover:text-white fill-current" />
                    <span className="text-black text-sm font-medium">
                      Google
                    </span>
                  </a>

                  <a
                    href="#"
                    className="group flex items-center justify-center px-4 py-2 bg-gray-800 border border-gray-800 rounded-md focus:outline-none space-x-2 transition-colors duration-300"
                  >
                    <GithubSVG className="w-5 h-5 text-white fill-current" />
                    <span className="text-white text-sm font-medium">
                      Github
                    </span>
                  </a>
                  <a
                    href="#"
                    className="group flex items-center justify-center px-4 py-2 bg-blue-500 border border-blue-500 rounded-md focus:outline-none space-x-2 transition-colors duration-300"
                  >
                    <TwitterSVG className="text-white" />
                    <span className="text-white text-sm font-medium">
                      Twitter
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
