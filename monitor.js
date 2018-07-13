const { spawn } = require("child_process");
const nodemailer = require("nodemailer");

const [, , programWithParams, email] = process.argv;

const [program, ...params] = programWithParams.split(/\s+/);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "youremail@server.com",
    pass: "<password>"
  }
});

const sendEmail = code => {
  const mailOptions = {
    from: "youremail@gmail.com",
    to: email,
    subject: "the service has restarted",
    text: `with the followng error: ${code}`
  };
  transporter.sendMail(mailOptions, (error, info) =>
    console.log(`email: ${error || info}`)
  );
};

const loop = () => {
  const childProcess = spawn(program, params);

  childProcess.stdout.on("data", data => console.log(`stdout: ${data}`));

  childProcess.stderr.on("data", data => console.log(`stderr: ${data}`));

  childProcess.on("close", code => {
    console.log(`child process exited with code ${code}`);
    if (code > 0) {
      sendEmail(code);
    }
    console.log(`restarting...`);
    setTimeout(() => loop(), 1000);
  });
};

// console.log(program, params);

loop()
