let template = () => {
    return  ` 
        <div class="form-title">
            <p>Login Form</p>
        </div>
        <form class="log-form" action="#">
            <input class="input-form" type="text" placeholder="username" name="username">
            <input class="input-form" type="password" placeholder="password" name="password">
            <button class="submit-button" type="submit" value="submit">Sing In</button>
        </form>
`
};

export default template