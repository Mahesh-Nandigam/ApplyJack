import pathlib

file_path = 'src/app/dashboard/page.js'
content = pathlib.Path(file_path).read_text(encoding='utf-8')

# Let's add the event listener inside the useEffect!
injection = """
  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', 'mahesh@applyjack.ai')
        .single();
      if (data) setUserProfile(data);
    };
    fetchProfile();

    // LISTEN FOR CHROME EXTENSION SYNC
    const handleExtensionSync = async (e) => {
      const { platform, cookie } = e.detail;
      const cookieKey = platform.toLowerCase() + '_cookie';
      
      const { error } = await supabase
        .from('user_profiles')
        .update({ [cookieKey]: cookie })
        .eq('email', 'mahesh@applyjack.ai');

      if (!error) {
        setUserProfile(prev => ({ ...prev, [cookieKey]: cookie }));
        triggerStepPopup(`${platform} account was magically synced by the Extension!`);
      }
    };
    
    window.addEventListener('ApplyJackExtensionSync', handleExtensionSync);
    return () => window.removeEventListener('ApplyJackExtensionSync', handleExtensionSync);
  }, []);
"""

# Replace the old useEffect with the new one
content = content.replace(
"""
  // Fetch user profile on load
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', 'mahesh@applyjack.ai')
        .single();
      if (data) setUserProfile(data);
    };
    fetchProfile();
  }, []);
""".strip(), 
injection.strip()
)

pathlib.Path(file_path).write_text(content, encoding='utf-8')
print("Successfully added Extension listener to Dashboard!")
