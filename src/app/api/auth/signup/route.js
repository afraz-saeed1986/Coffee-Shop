import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword, validateEmail, validatePassword, validatePhone } from "@/utils/auth";
import { roles } from "@/utils/constants";

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const { name, phone, email, password } = body;

  //Validation

  if(!name.trim()){
        return Response.json({success: false, message: "نام را وارد کنید"}, {status:400 });
    }

    const isValidPhone = validatePhone(phone);
    if(!isValidPhone){
        return Response.json({success: false, message: "شماره تماس وارد شده معتبر نیست"}, {status:400 });
    }

       if(email){
      const isValidEmail = validateEmail(email);
      if(!isValidEmail) {
          return Response.json({success: false, message: "ایمیل وارد شده معتبر نیست"}, {status:400 });
      }
    }

    const isValidPassword = validatePassword(password);
    if(!isValidPassword){
        return Response.json({success: false, message: "پسوورد وارد شده معتبر نیست"}, {status:400 });
    }

  const isUserExist = await UserModel.findOne({
    $or: [{ name }, { email }, { phone }],
  });

  if (isUserExist) {
    return Response.json(
      { message: "The username or email or phone exist already !!" },
      { status: 422 },
    );
  }

  const hashedPassword = await hashPassword(password);
  const accessToken = generateAccessToken({ name });

  const users = await UserModel.find({});

  await UserModel.create({
    name,
    email,
    phone,
    hashedPassword,
    role: users.length > 0 ? roles.USER : roles.ADMIN,
  });

  return Response.json(
    { message: "User signed up successfully :))" },
    {
      status: 201,
      headers: { "Set-Cookie": `token=${accessToken};path=/;httpOnly=true;` },
    },
  );
}
