 const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Music ID is required',
    });
  }

  try {
    const music = await Music.findById(id);
    if (!music) {
      return res.status(404).json({
        success: false,
        message: 'Music not found',
      });
    }

    // Validate Cloudinary public_id exists
    if (!music.public_id) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Cloudinary reference',
      });
    }

    // Explicitly set resource_type (default to 'auto' if not specified)
    const resourceType = music.resourceType || 'auto';

    // Ensure the resourceType is valid for Cloudinary
    const validTypes = ['image', 'video', 'raw', 'auto'];
    if (!validTypes.includes(resourceType)) {
      return res.status(400).json({
        success: false,
        message: `Invalid resource type '${resourceType}'. Must be one of: ${validTypes.join(', ')}`,
      });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(music.public_id, {
      resource_type: resourceType,
    });

    // Delete from DB
    await Music.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Music deleted successfully',
    });
  } catch (error) {
    console.error('Delete Music Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete music',
      error: error.message,
    });
  }