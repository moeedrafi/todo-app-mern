interface AvatarProps {
  avatar: string;
  fallbackAvatar: string;
  toggleOpen?: () => void;
}

export const Avatar = ({ toggleOpen, avatar, fallbackAvatar }: AvatarProps) => {
  return (
    <>
      {avatar ? (
        <img
          src={avatar}
          onClick={toggleOpen}
          className="w-10 h-10 rounded-full"
          alt="avatar"
        />
      ) : (
        <button
          onClick={toggleOpen}
          className="px-3 py-2 bg-black text-white rounded-full"
        >
          {fallbackAvatar[0].toUpperCase()}
        </button>
      )}
    </>
  );
};
