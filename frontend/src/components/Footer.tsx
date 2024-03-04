'use client';
import React from 'react';

export function FooterBar() {
  return (
    <footer className="bg-gray-50 bottom-0 w-full fixed">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center text-teal-600 sm:justify-start">
            <svg
              width="338"
              height="512"
              viewBox="0 0 338 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`w-10 h-10`}
            >
              <path
                d="M12.2764 512L114.099 413.066V330.742C114.099 330.742 192.09 332.186 214.477 330.742C236.863 329.298 249.14 318.465 257.083 310.522C265.027 302.578 272.248 291.024 272.248 277.303V248.418L235.419 263.583C236.863 282.358 226.031 296.801 212.31 296.801H80.158V397.634L79.8562 397.96C63.984 415.088 57.9773 421.57 48.3836 424.621V265.027H215.199C223.657 264.967 226.753 265.027 235.419 263.583L272.248 248.418C318.465 214.477 337.963 181.98 337.963 133.597C337.963 69.5529 285.247 20.9422 261.416 10.8322C250.456 6.18253 255.639 7.94358 244.085 3.61072C235.76 0.488881 232.604 2.47666e-06 226.753 5.38517e-06H0L62.1044 101.1H212.31C223.142 101.1 236.141 113.377 236.141 124.209L236.863 225.309C251.2 217.081 258.876 211.715 272.248 201.478L271.526 124.209C271.087 117.121 269.448 110.678 267.193 105.433C256.401 80.3219 233.252 66.4372 215.199 66.4372C215.199 66.4372 87.3794 66.4372 82.3244 65.7151C77.2694 64.993 61.1431 34.6629 64.2708 34.6629H223.865C249.862 39.7179 270.082 59.0845 278.748 69.3258C294.635 88.1016 304.023 111.21 302.578 139.374C301.134 167.537 291.273 188.249 272.248 201.478C258.876 211.715 251.2 217.081 236.863 225.309C229.642 228.92 228.626 229.169 220.254 228.92H12.9986L12.2764 512Z"
                fill="url(#paint0_linear_2359_89)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_2359_89"
                  x1="168.982"
                  y1="0"
                  x2="168.982"
                  y2="512"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#953783" />
                  <stop offset="1" stop-color="#6C2983" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; 2024. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
