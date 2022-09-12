module AppHelper
  def title(value = nil)
    @title = value if value
    @title ? "Spec Workshop - #{@title}" : "Spec Workshop"
  end
end
