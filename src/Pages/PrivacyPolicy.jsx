import React from "react";

const privacy_policy = [
  {
    heading: "Who we are",
    description: "Our website address is: http://toyup.local.",
  },
  {
    heading: "Comments",
    description:
      "When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection. An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.",
  },
  {
    heading: "Media",
    description:
      "If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.",
  },
  {
    heading: "Cookies",
    description:
      "If you leave a comment on our site you may opt-in to saving your name, email address and website in cookies. These are for your convenience so that you do not have to fill in your details again when you leave another comment. These cookies will last for one year. If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser. When you log in, we will also set up several cookies to save your login information and your screen display choices. Login cookies last for two days, and screen options cookies last for a year. If you select 'Remember Me', your login will persist for two weeks. If you log out of your account, the login cookies will be removed. If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.",
  },
  {
    heading: "Embedded content from other websites",
    description:
      "Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website. These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction with the embedded content if you have an account and are logged in to that website.",
  },
  {
    heading: "Who we share your data with",
    description:
      "If you request a password reset, your IP address will be included in the reset email.",
  },
  {
    heading: "How long we retain your data",
    description:
      "If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve any follow-up comments automatically instead of holding them in a moderation queue. For users that register on our website (if any), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also see and edit that information.",
  },
  {
    heading: "What rights you have over your data",
    description:
      "If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.",
  },
  {
    heading: "Where your data is sent",
    description:
      "Visitor comments may be checked through an automated spam detection service.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="w-full h-full py-10 bg-[#f8f9fa]">
      <div className="w-full mx-auto flex flex-col gap-8 px-5 lg:px-12">
        <p className="text-[32px] md:text-[38px] leading-[48px] md:leading-[57px] text-black font-semibold">Privacy Policy</p>
        {
          privacy_policy.map((item, index) => (
            <div className="flex flex-col gap-1 w-full" key={index}>
              <p className="text-[#001430] text-[27px] leading-[40px] font-bold">{item.heading}</p>
              <p className="text-[#69778a] text-[16px] leading-[24px] font-medium">{item.description}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PrivacyPolicy;
