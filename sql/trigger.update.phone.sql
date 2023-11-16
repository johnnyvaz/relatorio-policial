CREATE OR REPLACE FUNCTION update_user_phone()
RETURNS trigger AS
$$
BEGIN
  UPDATE auth.users
  SET phone = NEW.phone
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profile_phone_update
AFTER UPDATE ON public.profiles
FOR EACH ROW
EXECUTE PROCEDURE update_user_phone();