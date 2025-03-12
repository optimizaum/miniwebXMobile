
import UserProfile from "../models/minwebtemplate.model.js";

// ✅ Create or Update User Profile
export const createOrUpdateUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const {  name, position, aboutUs, call, whatsapp, email, website,address,socialLinks} = req.body;

    // Check if user profile exists
    let userProfile = await UserProfile.findOne({ userId });

    // Handle file uploads (logo & banner)
    let logo = userProfile?.logo || "";
    let banner = userProfile?.banner || [];

    if (req.files["logo"]) {
      logo = req.files["logo"][0].path; // Get logo file path
    }

    if (req.files["banner"]) {
      banner = req.files["banner"].map((file) => file.path); // Get banner image paths
    }

    // If profile exists, update it
    if (userProfile) {
      userProfile = await UserProfile.findOneAndUpdate(
        { userId },
        { name, position, aboutUs, call, whatsapp, email, website, logo, banner,address,socialLinks },
        { new: true }
      );
    } else {
      // Create a new profile
      userProfile = await UserProfile.create({
        userId,
        name,
        position,
        aboutUs,
        call,
        whatsapp,
        email,
        website,
        logo,
        banner,
        socialLinks,
        address
      });
    }

    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Get User Profile by userId
export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const userProfile = await UserProfile.findOne({ userId });

    if (!userProfile) {
      return res.status(404).json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Delete User Profile
export const deleteUserProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserProfile.findOneAndDelete({ userId });

    res.status(200).json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
